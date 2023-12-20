import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import styles from './Record.module.css'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css'

const Record = (props: any) => {
  const [ip, setIp] = useState<string>('')
  // console.log('props', props)
  const records = props.records

  const firstRecord = records[0]

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post(
      'https://panel.stat-gurteam.info/cloudflare/api/updaterecord',
      {
        content: ip,
        name: firstRecord.name,
        type: firstRecord.type,
        zoneId: firstRecord.zone_id,
        id: firstRecord.id,
        key: props.accountkey,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    // console.log('updateRecord', updateRecord)
    toast.success('IP успешно обновлен', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
    try {
    } catch (error) {
      console.error('Went wrong update record type', error)
    }
  }

  return (
    <div>
      <ToastContainer />
      {firstRecord && (
        <form
          className="p-4 border mb-4"
          onSubmit={handleUpdate}
          key={firstRecord.id}
        >
          <h1 className="text-lg font-semibold mb-2">Домен</h1>
          <div className="mb-2">{firstRecord.name}</div>
          <div className="mb-2">{firstRecord.content}</div>
          <div className="mb-2">{firstRecord.type}</div>
          <input
            type="text"
            placeholder="IP"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="p-2 border mb-2 rounded"
          />
          <button className="bg-green-500 text-white p-2 rounded cursor-pointer">
            Обновить IP домена
          </button>
        </form>
      )}
    </div>
  )
}
export default Record
