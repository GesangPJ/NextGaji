"use client"

import React, { useState, useEffect, useRef } from 'react'

import {
  Card, Grid, Button, TextField, CardHeader, CardContent,
  InputAdornment, Alert, FormControl, InputLabel
} from '@mui/material'

const FormDataPph21 = () => {
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
        const response = await fetch(`/api/data-pph21`)
        const result = await response.json()

        console.log(result)

        setData(result.pph21[0])
      } catch (error) {
        console.error('Error fetching detail data:', error)
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
      const response = await fetch('/api/edit-pph21', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Nilai Pph21 berhasil diganti!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setAlert('error')
        setMessage(result.error || 'Terjadi kesalahan saat mengubah Nilai Pph21.')
      }
    } catch (error) {
      setAlert('error')
      setMessage('Terjadi kesalahan saat mengubah Nilai Pph21.')
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
                { id: 'pph21_60', label: 'Pph21 <= Rp60 Juta', value: 'pph21_60' },
                { id: 'pph21_250', label: 'Pph21 <= Rp250 Juta', value: 'pph21_250' },
                { id: 'pph21_500', label: 'Pph21 <= Rp500 Juta', value: 'pph21_500' },
                { id: 'pph21_5m', label: 'Pph21 <= Rp5 Milyar', value: 'pph21_5m' },
                { id: 'pph21_5ma', label: 'Pph21 diatas Rp5 Milyar', value: 'pph21_5ma' },
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
                <Button variant='contained' type='submit'>
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

export default FormDataPph21
