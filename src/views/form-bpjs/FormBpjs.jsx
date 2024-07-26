"use client"

import React, { useState, useEffect, useRef } from 'react'

import {
  Card, Grid, Button, TextField, CardHeader, CardContent,
  InputAdornment, Alert, FormControl, InputLabel
} from '@mui/material'

const FormDataBpjs = () => {
  const [data, setData] = useState({
    bpjskes_perusahaan: '',
    bpjsjht_perusahaan: '',
    bpjsjkk_perusahaan: '',
    bpjsjkm_perusahaan: '',
    bpjsjp_perusahaan: '',
    bpjskes_peg: '',
    bpjsjht_peg: '',
    bpjsjp_peg: '',
    masterKey: ''
  })

  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data-bpjs`)
        const result = await response.json()

        console.log(result)

        setData(result.bpjs[0])
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
      const response = await fetch('/api/edit-bpjs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Nilai BPJS berhasil diganti!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setAlert('error')
        setMessage(result.error || 'Terjadi kesalahan saat mengubah Nilai BPJS.')
      }
    } catch (error) {
      setAlert('error')
      setMessage('Terjadi kesalahan saat mengubah Nilai BPJS.')
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
                { id: 'bpjsjht_perusahaan', label: 'BPJS Kesehatan (Perusahaan)', value: 'bpjskes_perusahaan' },
                { id: 'bpjsjht_perusahaan', label: 'BPJS Jaminan Hari Tua (Perusahaan)', value: 'bpjsjht_perusahaan' },
                { id: 'bpjsjkk_perusahaan', label: 'BPJS Jaminan Kecelakaan (Perusahaan)', value: 'bpjsjkk_perusahaan' },
                { id: 'bpjsjkm_perusahaan', label: 'BPJS Jaminan Kematian (Perusahaan)', value: 'bpjsjkm_perusahaan' },
                { id: 'bpjsjp_perusahaan', label: 'BPJS Jaminan Pensiun (Perusahaan)', value: 'bpjsjp_perusahaan' },
                { id: 'bpjskes_peg', label: 'BPJS Kesehatan (Pegawai)', value: 'bpjskes_peg' },
                { id: 'bpjsjht_peg', label: 'BPJS Jaminan Hari Tua (Pegawai)', value: 'bpjsjht_peg' },
                { id: 'bpjsjp_peg', label: 'BPJS Jaminan Pensiun (Pegawai)', value: 'bpjsjp_peg' },
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

export default FormDataBpjs
