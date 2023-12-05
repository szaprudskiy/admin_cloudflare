import { useState, FormEvent, useEffect } from 'react'
import axios from 'axios'

import Record from '../record/Record'
import styles from './Records.module.css'
import { Account } from '../interfaces/account'

const Records = () => {
  const [key, setKey] = useState<string>('')
  const [records, setRecords] = useState<[]>([])
  const [zone, setZone] = useState<string>('')
  const [accounts, setAccounts] = useState<Account[]>([])

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
          keyId: key,
          zoneId: zone,
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    getDnsRecords()
  }
  return (
    <div>
      <div className={styles.records}>
        <form onSubmit={handleSubmit}>
          <select className={styles.selectzone} defaultValue="default">
            <option value="default" disabled hidden>
              Choose an account
            </option>
            {accounts.map((item, index) => {
              console.log('Mapping account:', index, item)
              return (
                <option key={index} value={item.account.accountKey}>
                  {item.account.accountName}
                </option>
              )
            })}
          </select>

          <button className={styles.button}>get Data</button>
        </form>
      </div>
    </div>
  )
}
export default Records
