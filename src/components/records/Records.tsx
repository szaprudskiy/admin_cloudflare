import { useState, FormEvent, useEffect } from 'react'
import axios from 'axios'
import { FormData, Account } from '../interfaces/account'
import styles from './Records.module.css'

const Records: React.FC = () => {
  const [accountName, setAccountName] = useState<string>('')
  const [accountKey, setAccountKey] = useState<string>('')
  const [domainName, setDomainName] = useState<string>('')
  const [domainId, setDomainId] = useState<string>('')

  const [key, setKey] = useState<string>('')
  const [records, setRecords] = useState<[]>([])
  const [zone, setZone] = useState<string>('')
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedaAccout] = useState<string>('')
  const [selectedDomain, setSelectedDomain] = useState<string>('')

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
      const response = await axios.post('http://localhost:4002/api/account', [
        formData,
      ])
      getAccounts()
      console.log('response', response.data)
    } catch (error) {
      console.error('Ошибка при отправке данных:', error)
    }
  }

  const getAccounts = async () => {
    try {
      const responseAccounts = await axios.get(
        `http://localhost:4002/api/getaccounts`
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
      const responseRecords = await axios.post(
        `http://localhost:4002/api/getdnsrecords`,
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
    }
  }

  const handleGetRecords = (e: FormEvent) => {
    e.preventDefault()
    getDnsRecords()
  }

  return (
    <div className={styles.records}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Укажите название аккаунта"
          value={accountName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAccountName(e.target.value)
          }
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Укажите ключ аккаунта"
          value={accountKey}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAccountKey(e.target.value)
          }
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Укажите название домена"
          value={domainName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDomainName(e.target.value)
          }
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Укажите айди домена"
          value={domainId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDomainId(e.target.value)
          }
        />
        <button className={styles.button} type="submit">
          Добавить аккаунт
        </button>
      </form>
      <form onSubmit={handleGetRecords}>
        <select
          className={styles.selectzone}
          defaultValue="default"
          onChange={(e) => setSelectedaAccout(e.target.value)}
          value={selectedAccount}
        >
          <option value="default" disabled hidden>
            Choose an account
          </option>
          {accounts.map((item, index) => (
            <option key={index} value={item.account.accountKey}>
              {item.account.accountName}
            </option>
          ))}
        </select>
        <select
          className={styles.selectzone}
          defaultValue="default"
          onChange={(e) => setSelectedDomain(e.target.value)}
          value={selectedDomain}
        >
          <option value="default" disabled hidden>
            Choose an domain
          </option>
          {accounts.map((item, index) => (
            <option key={index} value={item.domain.domainId}>
              {item.domain.domainName}
            </option>
          ))}
        </select>

        <button className={styles.button}>Получить данные</button>
      </form>
    </div>
  )
}
export default Records
