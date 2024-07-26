"use client"

import { useState, useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'

const FormDataBpjs = () => {
  const { data: session, status } = useSession()
  const [dataBPJS, setDataBPJS] = useState({})
  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if(status === 'loading') return

    if(!session){
      router.push('/error/401')
    }

    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/data-bpjs')
        const data = await response.json()

        setDataBPJS(data)
      } catch (error) {
        console.error('Error mengambil data BPJS :', error)
      }
    }

    fetchData()
  }, [alert, session, status, router])

  if(!session){
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    const formData = {
      bpjskes_perusahaan: parseFloat(data.get('bpjskes_perusahaan').replace(',', '.')),
      bpjsjht_perusahaan: parseFloat(data.get('bpjsjht_perusahaan').replace(',', '.')),
      bpjsjkk_perusahaan: parseFloat(data.get('bpjsjkk_perusahaan').replace(',', '.')),
      bpjskm_perusahaan: parseFloat(data.get('bpjskm_perusahaan').replace(',', '.')),
      bpjsjp_perusahaan: parseFloat(data.get('bpjsjp_perusahaan').replace(',', '.')),
      bpjskes_peg: parseFloat(data.get('bpjskes_peg').replace(',', '.')),
      bpjsjht_peg: parseFloat(data.get('bpjsjht_peg').replace(',', '.')),
      bpjsjp_peg: parseFloat(data.get('bpjsjp_peg').replace(',', '.')),
      masterKey: ''
    }

    try {
      const response = await fetch('/api/edit-bpjs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Data BPJS berhasil diperbarui!')
        formRef.current.reset()
      } else {
        setAlert('error')
        setMessage(result.error || 'Terjadi kesalahan saat mengirim data.')
      }
    } catch (error) {
      setAlert('error')
      setMessage('Terjadi kesalahan saat mengirim data.')
    }
  }

  return (
    <div>
      <Card>
        <CardHeader title='Form Data BPJS' />
        <CardContent>
          {alert && (
            <Alert severity={alert} style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={5}>
              {Object.entries(dataBPJS).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                  <TextField
                    id={key}
                    name={key}
                    type='number'
                    fullWidth
                    label={key.replace('_', ' ').toUpperCase()}
                    placeholder={key.replace('_', ' ').toUpperCase()}
                    defaultValue={value}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              ))}
              <Grid>
              <TextField
                name="masterKey"
                label="MasterKey"
                type="password"
                fullWidth
                value={formData.masterKey}
                onChange={handleChange}
              />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant='contained' type='submit'>
                  Kirim Data
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormDataBpjs
