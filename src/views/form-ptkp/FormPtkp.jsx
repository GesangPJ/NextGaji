"use client"

import React, { useState, useEffect, useRef } from 'react'

import {
  Card, Grid, Button, TextField, CardHeader, CardContent,
  InputAdornment, Alert, FormControl, InputLabel
} from '@mui/material'

const FormDataPtkp = () => {
  const [data, setData] = useState({
    pph21_60:'',
    pph21_250:'',
    pph21_500:'',
    pph21_5m:'',
    pph21_5ma:'',
    masterKey: ''
  })

  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data-ptkp`)
        const result = await response.json()

        console.log(result)

        setData(result.pph21[0])
      } catch (error) {
        console.error('Error fetching data PTKP:', error)
      }
    }

    fetchData()

    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [alert])

  const handleChange = (e) => {
    const { name, value } = e.target

    setData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = { ...data }

    try {
      const response = await fetch('/api/edit-ptkp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Nilai PTKP berhasil diganti!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setAlert('error')
        setMessage(result.error || 'Terjadi kesalahan saat mengubah Nilai PTKP.')
      }
    } catch (error) {
      setAlert('error')
      setMessage('Terjadi kesalahan saat mengubah Nilai PTKP.')
    }
  }

  return (
    <div>
      <Card>
        <CardHeader title='' />
        <CardContent>
          {alert && (
            <Alert severity={alert} style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={5}>
              {[
                { id: 'tk0', label: 'Tidak Kawin 0 (TK0)', value: 'tk0' },
                { id: 'tk1', label: 'Tidak Kawin 1 (TK1)', value: 'tk1' },
                { id: 'tk2', label: 'Tidak Kawin 2 (TK2)', value: 'tk2' },
                { id: 'tk3', label: 'Tidak Kawin 3 (TK3)', value: 'tk3' },
                { id: 'k0', label: 'Kawin 0 (K0)', value: 'k0' },
                { id: 'k1', label: 'Kawin 1 (K1)', value: 'k1' },
                { id: 'k2', label: 'Kawin 2 (K2)', value: 'k2' },
                { id: 'k3', label: 'Kawin 3 (K3)', value: 'k3' },
                { id: 'ki0', label: 'Gabungan 0 (Ki0)', value: 'ki0' },
                { id: 'ki1', label: 'Gabungan 1 (Ki1)', value: 'ki1' },
                { id: 'ki2', label: 'Gabungan 2 (Ki2)', value: 'ki2' },
                { id: 'ki3', label: 'Gabungan 3 (Ki3)', value: 'ki3' },
              ].map(({ id, label, value }) => (
                <Grid item xs={12} container alignItems="center" spacing={2} key={id}>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor={id} className='text-lg font-bold'>
                        {label}
                      </InputLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      className='max-w-[105px]'
                      id={id}
                      name={value}
                      fullWidth
                      type='number'
                      min='0'
                      max='100'
                      value={data[value]}
                      placeholder={label}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <i className="ri-percent-line"></i>
                          </InputAdornment>
                        )
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='masterKey' className='text-lg font-bold'>
                      Master Key
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    className='max-w-[355px]'
                    id='masterKey'
                    name='masterKey'
                    fullWidth
                    type='text'
                    value={data.masterKey}
                    placeholder='Master Key'
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant='contained' type='submit' sx={ { borderRadius: 30 } }>
                  Ganti Nilai
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormDataPtkp
