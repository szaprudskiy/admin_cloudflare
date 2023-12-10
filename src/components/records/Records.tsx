import { useState, FormEvent, useEffect } from 'react'
import axios from 'axios'
import GridLoader from 'react-spinners/GridLoader'
import { FormData, Account } from '../interfaces/account'
import { ToastContainer, toast } from 'react-toastify'
import Record from '../record/Record'
import styles from './Records.module.css'

const Records: React.FC = () => {
  const [accountName, setAccountName] = useState<string>('')
  const [accountKey, setAccountKey] = useState<string>('')
  const [domainName, setDomainName] = useState<string>('')
  const [domainId, setDomainId] = useState<string>('')
  const [records, setRecords] = useState<[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>('')
  const [selectedDomain, setSelectedDomain] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData: FormData = {
        account: {
          accountName,
          accountKey,
        },
        domain: {
          domainName,
          domainId,
        },
      }
      const response = await axios.post(
        'https://panel.stat-gurteam.info/cloudflare/api/account',
        [formData]
      )
      getAccounts()
      toast.success('Данные успешно добавлены', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
      console.log('response', response.data)
    } catch (error) {
      console.error('Ошибка при отправке данных:', error)
    }
  }

  const getAccounts = async () => {
    try {
      const responseAccounts = await axios.get(
        `https://panel.stat-gurteam.info/cloudflare/api/getaccounts`
      )
      setAccounts(responseAccounts.data)
      console.log('responseAccounts', responseAccounts.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getAccounts()
  }, [])

  const getDnsRecords = async () => {
    try {
      setLoading(true)
      const responseRecords = await axios.post(
        `https://panel.stat-gurteam.info/cloudflare/api/getdnsrecords`,
        {
          keyId: selectedAccount,
          zoneId: selectedDomain,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setRecords(responseRecords.data)
      console.log(responseRecords.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGetRecords = (e: FormEvent) => {
    e.preventDefault()
    getDnsRecords()
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded shadow">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="mb-6">
        <h1 className="text-3xl font-semibold mb-4">Аккаунт</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              className="p-2 border mb-2 rounded w-8/12"
              type="text"
              placeholder="Укажите название аккаунта"
              value={accountName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccountName(e.target.value)
              }
            />
          </div>
          <div>
            <input
              className="p-2 border mb-2 rounded w-8/12"
              type="text"
              placeholder="Укажите ключ аккаунта"
              value={accountKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccountKey(e.target.value)
              }
            />
          </div>
        </div>
        <h1 className="text-3xl font-semibold mb-4">Домен</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <input
              className="p-2 border mb-2 rounded w-8/12"
              type="text"
              placeholder="Укажите название домена"
              value={domainName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDomainName(e.target.value)
              }
            />
          </div>
          <div>
            <input
              className="p-2 border mb-2 rounded w-8/12"
              type="text"
              placeholder="Укажите айди домена"
              value={domainId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDomainId(e.target.value)
              }
            />
          </div>
        </div>
        <button
          className="button bg-blue-500 text-white p-2 rounded cursor-pointer"
          type="submit"
        >
          Зарегистрировать аккаунт и домен
        </button>
      </form>
      <form onSubmit={handleGetRecords} className="mb-6">
        <h1 className="text-3xl font-semibold mb-4">
          Выберите из списка аккаунт и домен
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Выберите аккаунт
            </label>
            <select
              className="select"
              onChange={(e) => setSelectedAccount(e.target.value)}
              value={selectedAccount}
            >
              <option value="default">Выберите аккаунт</option>
              {accounts.map((item, index) => (
                <option key={index} value={item.account.accountKey}>
                  {item.account.accountName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Выберите домен
            </label>
            <select
              className="select"
              onChange={(e) => setSelectedDomain(e.target.value)}
              value={selectedDomain}
            >
              <option value="default">Выберите домен</option>
              {accounts.map((item, index) => (
                <option key={index} value={item.domain.domainId}>
                  {item.domain.domainName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="bg-green-500 text-white p-2 rounded cursor-pointer">
          Получить данные
        </button>
      </form>
      {loading ? (
        <GridLoader color="#36d7b7" />
      ) : (
        <Record records={records} accountkey={selectedAccount} />
      )}
    </div>
  )
}
export default Records
