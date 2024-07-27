// VerticalMenu. Lokasi : /src/components/layout/vertical/VerticalMenu.jsx

'use client'

import React from 'react'

import { useSession } from 'next-auth/react'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }) => {
  const { data: session } = useSession()
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  if (!session) {
    return null
  }

  const isAdmin = session.user.userType === 'ADMIN'
  const isKaryawan = session.user.userType === 'KARYAWAN'

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        {isAdmin && (
          <>
            <MenuItem
              href='/dashboard'
              icon={<i className="ri-dashboard-line"></i>}
            >
              Dashboard
            </MenuItem>
            <MenuSection Label='Penggajian'>
              <SubMenu
                label='Slip Gaji'
                icon={<i className="ri-receipt-line"></i>}
              >
                <MenuItem href='/dashboard/gaji-karyawan'>Slip Gaji Karyawan</MenuItem>
                <MenuItem href='/dashboard/gaji-semua'>Slip Gaji Keseluruhan</MenuItem>
              </SubMenu>
            </MenuSection>
            <SubMenu
              label='Data Pendukung'
              icon={<i className="ri-database-2-line"></i>}
            >
              <MenuItem href='/dashboard/bpjs'>Data Nilai BPJS</MenuItem>
              <MenuItem href='/dashboard/pph21'>Data Nilai Pph21</MenuItem>
              <MenuItem href='/dashboard/ptkp'>Data Nilai PTKP</MenuItem>
              <MenuItem href='/dashboard/tunjangan'>Data Nilai Tunjangan</MenuItem>
            </SubMenu>
            <SubMenu
              label='Manajemen Akun'
              icon={<i className='ri-account-circle-fill' />}
            >
              <MenuItem href='/dashboard/daftar-akun'>Tabel Akun</MenuItem>
              <MenuItem href='/dashboard/registrasi-akun'>Registrasi Akun</MenuItem>
              <MenuItem href='/dashboard/reset-password-akun'>Reset Password Akun</MenuItem>
            </SubMenu>
            <SubMenu
              label='Bantuan'
              icon={<i className="ri-question-line"></i>}
            >
              <MenuItem href='/dashboard/bantuan'>Penggunaan</MenuItem>
              <MenuItem href='/dashboard/dokumentasi-api'>Dokumentasi API</MenuItem>
            </SubMenu>
          </>
        )}

        {isKaryawan && (
          <>
            <MenuItem
              href='/dashboard'
              icon={<i className="ri-dashboard-line"></i>}
            >
              Dashboard
            </MenuItem>
            <MenuSection Label='Data Akun'>
              <SubMenu
                label='Akun'
                icon={<i className="ri-account-circle-line"></i>}
              >
                <MenuItem href='/dashboard/edit-akun'>Edit Data Akun</MenuItem>
              </SubMenu>
              <SubMenu
              label='Bantuan'
              icon={<i class="ri-question-line"></i>}
            >
              <MenuItem href='/dashboard/bantuan'>Penggunaan</MenuItem>
            </SubMenu>
            </MenuSection>
          </>
        )}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
