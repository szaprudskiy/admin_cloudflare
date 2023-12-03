import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

import styles from './Auth.module.css'

const Auth = () => {
  const [key, setKey] = useState<string>('')
  const [data, setData] = useState<[]>([])
  const [zone, setZone] = useState<string>('')

  const getDnsRecords = async () => {
    try {
      const result = await axios.post(
        `http://localhost:4002/api/getdnsrecords`,
        {
          keyId: key,
          zoneId: zone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setData(result.data)
      console.log(result.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value)
  }

  const handleChangeZone = (e: ChangeEvent<HTMLInputElement>) => {
    setZone(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    getDnsRecords()
  }
  return (
    <div className={styles.auth}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={key}
          type="text"
          onChange={handleChange}
          placeholder="Specify KEY ID"
        />
        <input
          className={styles.input}
          value={zone}
          type="text"
          onChange={handleChangeZone}
          placeholder="Specify ZONE ID"
        />
        <button className={styles.button}>get Data</button>
      </form>
    </div>
  )
}
export default Auth
