"use client"

import React, { useState, useEffect, useRef } from 'react'

import {
  Card, Grid, Button, TextField, CardHeader, CardContent,
  InputAdornment, Alert, FormControl, InputLabel
} from '@mui/material'

const FormDataBpjs = () => {
  const [data, setData] = useState('')

  // const [data, setData] = useState({
  //   bpjskes_perusahaan: '',
  //   bpjsjht_perusahaan: '',
  //   bpjsjkm_perusahaan: '',
  //   bpjsjkk_perusahaan: '',
  //   bpjsjp_perusahaan: '',
  //   bpjskes_peg: '',
  //   bpjsjht_peg: '',
  //   bpjsjp_peg: '',
  //   masterKey: ''
  // })

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
      <div>

      </div>
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
            <Grid item xs={12} container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
                      BPJS Kesehatan (Perusahaan)
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={9}>
                  <TextField className='max-w-[105px]'
                    id='bpjskes_perusahaan'
                    name='bpjskes_perusahaan'
                    fullWidth
                    type='number'
                    min='0'
                    max='100'
                    value={data.bpjskes_perusahaan}
                    placeholder='BPJS JHT'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
                      BPJS Jaminan Hari Tua (Perusahaan)
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={9}>
                  <TextField className='max-w-[105px]'
                    id='bpjsjht_perusahaan'
                    name='bpjsjht_perusahaan'
                    fullWidth
                    type='number'
                    min='0'
                    max='100'
                    value={data.bpjsjht_perusahaan}
                    placeholder='BPJS JHT'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
                      BPJS Jaminan Kecelakaan (Perusahaan)
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    className='max-w-[105px]'
                    id='bpjsjkk_perusahaan'
                    name='bpjsjkk_perusahaan'
                    fullWidth
                    type='number'
                    min='0'
                    max='100'
                    value={data.bpjsjkk_perusahaan}
                    placeholder='BPJS JKK'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
                      BPJS Jaminan Kematian (Perusahaan)
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    className='max-w-[105px]'
                    id='bpjsjkm_perusahaan'
                    name='bpjsjkm_perusahaan'
                    fullWidth
                    type='number'
                    min='0'
                    max='100'
                    value={data.bpjsjkm_perusahaan}
                    placeholder='BPJS JKM'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
                      BPJS Jaminan Pensiun (Perusahaan)
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    className='max-w-[105px]'
                    id='bpjsjp_perusahaan'
                    name='bpjsjp_perusahaan'
                    fullWidth
                    type='number'
                    min='0'
                    max='100'
                    value={data.bpjsjp_perusahaan}
                    placeholder='BPJS JHT'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
                      BPJS Kesehatan (Pegawai)
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    className='max-w-[105px]'
                    id='bpjskes_peg'
                    name='bpjskes_peg'
                    fullWidth
                    type='number'
                    min='0'
                    max='100'
                    value={data.bpjskes_peg}
                    placeholder='BPJS JHT'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
                      BPJS Jaminan Hari Tua (Pegawai)
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    className='max-w-[105px]'
                    id='bpjsjht_peg'
                    name='bpjsjht_peg'
                    fullWidth
                    type='number'
                    min='0'
                    max='100'
                    value={data.bpjsjht_peg}
                    placeholder='BPJS JHT'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
                      BPJS Jaminan Pensiun (Pegawai)
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    className='max-w-[105px]'
                    id='bpjsjp_peg'
                    name='bpjsjp_peg'
                    fullWidth
                    type='number'
                    min='0'
                    max='100'
                    value={data.bpjsjp_peg}
                    placeholder='BPJS JHT'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <i className="ri-percent-line"></i>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor='bpjsjht_perusahaan' className='text-lg font-bold'>
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
    </div>
  )
}

export default FormDataBpjs
