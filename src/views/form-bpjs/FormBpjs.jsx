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
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'

const FormDataBpjs = () => {
  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)
  const router = useRouter()

  useEffect(() => {

    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [alert])

  if (!session) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      userType: data.get('userType')
    }

    try {
      const response = await fetch('/api/registrasi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Akun berhasil didaftarkan!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setAlert('error')
        setMessage(result.error || 'Terjadi kesalahan saat mendaftarkan akun.')
      }
    } catch (error) {
      setAlert('error')
      setMessage('Terjadi kesalahan saat mendaftarkan akun.')
    }
  }

  return (
    <div>
      <Card>
        <CardHeader title='Registrasi Akun' />
        <CardContent>
          {alert && (
            <Alert severity={alert} style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='bpjskes_perusahaan'
                  name='bpjskes_perusahaan'
                  fullWidth
                  type='number'
                  min='1'
                  max='100'
                  value=''
                  label='BPJS Kesehatan (Perusahaan)'
                  placeholder='BPJS Kesehatan'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <i className="ri-percent-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='bpjsjht_perusahaan'
                  name='bpjsjht_perusahaan'
                  fullWidth
                  type='number'
                  value=''
                  min='1'
                  max='100'
                  label='BPJS Jaminan Hari Tua (Perusahaan)'
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
              <Grid item xs={12}>
                <TextField
                  id='bpjsjkk_perusahaan'
                  name='bpjsjkk_perusahaan'
                  fullWidth
                  type='number'
                  value=''
                  min='1'
                  max='100'
                  label='BPJS Jaminan Kecelakaan (Perusahaan)'
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
              <Grid item xs={12}>
                <TextField
                  id='bpjsjkm_perusahaan'
                  name='bpjsjkm_perusahaan'
                  fullWidth
                  type='number'
                  value=''
                  min='1'
                  max='100'
                  label='BPJS Jaminan Kematian (Perusahaan)'
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
              <Grid item xs={12}>
                <TextField
                  id='bpjsjp_perusahaan'
                  name='bpjsjp_perusahaan'
                  fullWidth
                  type='number'
                  value=''
                  min='1'
                  max='100'
                  label='BPJS Jaminan Pensiun (Perusahaan)'
                  placeholder='BPJS JP'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <i className="ri-percent-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='bpjskes_peg'
                  name='bpjskes_peg'
                  fullWidth
                  type='number'
                  value=''
                  min='1'
                  max='100'
                  label='BPJS Kesehatan (Pegawai)'
                  placeholder='BPJS Kesehatan'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <i className="ri-percent-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='bpjsjht_peg'
                  name='bpjsjht_peg'
                  fullWidth
                  type='number'
                  value=''
                  min='1'
                  max='100'
                  label='BPJS Jaminan Hari Tua (Pegawai)'
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
              <Grid item xs={12}>
                <TextField
                  id='bpjsjp_peg'
                  name='bpjsjp_peg'
                  fullWidth
                  type='number'
                  value=''
                  min='1'
                  max='100'
                  label='BPJS Jaminan Pensiun (Pegawai)'
                  placeholder='BPJS JP'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <i className="ri-percent-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
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
