import { useState } from 'react'
import axios from 'axios'
import { FormData } from '../interfaces/account'
import styles from './Account.module.css'

const Registration: React.FC = () => {
  const [accountName, setAccountName] = useState<string>('')
  const [accountKey, setAccountKey] = useState<string>('')
  const [domainName, setDomainName] = useState<string>('')
  const [domainId, setDomainId] = useState<string>('')

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
      console.log('response', response.data)
    } catch (error) {
      console.error('Ошибка при отправке данных:', error)
    }
  }

  return (
    <div className={styles.registration}>
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
          Добавить регистрацию
        </button>
      </form>
    </div>
  )
}
export default Registration
