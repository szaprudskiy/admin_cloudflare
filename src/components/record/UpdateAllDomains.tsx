import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

interface UpdateAllDomainsProps {
  recordsByAccount: { records: any[] }[]
  keyByAccount: string
}

const UpdateAllDomains: React.FC<UpdateAllDomainsProps> = (props: any) => {
  const { recordsByAccount, keyByAccount } = props
  const [ip, setIp] = useState<string>('')
  const accounts: any[] = recordsByAccount.flatMap(
    (account: any) => account.records
  )

  const handleUpdate = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      for (const account of accounts) {
        await axios.post(
          'http://localhost:4002/cloudflare/api/updaterecord',
          {
            content: ip,
            name: account.name,
            type: account.type,
            zoneId: account.zone_id,
            id: account.id,
            key: keyByAccount,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        // console.log('updateRecord', updateRecord)
        toast.success(`IP ${account.name} успешно обновлен `, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      }
    } catch (error) {
      console.error('Went wrong update record type', error)
    }
  }

  return (
    <>
      <ToastContainer />
      {!!accounts.length && (
        <div className="container mx-auto p-4 border mb-4">
          <ul>
            {accounts.map((record, index) => (
              <li key={index} className="mb-2">
                <strong>Name:</strong> {record.name}, <strong>Content:</strong>{' '}
                {record.content}, <strong>Type:</strong> {record.type}
              </li>
            ))}
          </ul>
          <form onSubmit={handleUpdate} className="mt-4">
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
        </div>
      )}
    </>
  )
}

export default UpdateAllDomains
