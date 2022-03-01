import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Edit as EditIcon, Trash } from 'react-feather'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'
import { gender, IUser, IUserState } from './../../constants/constantData';
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, removeClient } from '../../state/actions/userActions'
import NumberFormat from 'react-number-format'
import EditUser from '../../components/editUser/editUser'
import { calcAge } from '../../utils/validateDate'
import { useSnackbar, VariantType } from 'notistack'
const UserList = () => {
  const user : Array<IUser> = useSelector<IUserState, Array<IUser>>(state => state.users.users);
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar()
  function openInformation(data: string, type: VariantType) {
    enqueueSnackbar(data, {
      variant: type,
    })
  }
  const deleteEmployee = async (id: number) => {
    const response: any = await dispatch(removeClient(id))
    if (response.status === 200)
      openInformation('Empleado eliminado', 'success')
    else openInformation('Error al eliminar empleado', 'error')
  }
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 6))
    setPage(0)
  }
  const descendingComparator = (a: any, b: any, orderBy: any) => {
    return b[orderBy] > a[orderBy] ? -1 : b[orderBy] == a[orderBy] ? 0 : 1
  }
  const getComparator = (order: any, orderBy: any) => {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy)
  }
  const stableSort = (array: Array<any>, comparator: any) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      return order !== 0 ? order : a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }
  useEffect(() => {
    dispatch(getUsers());
  }, [])
  return (
    <Paper sx={{marginTop: 2}}>
      <Toolbar><img src='https://credilike.com.co/wp-content/uploads/2019/10/logo-credilike.png' alt='logo'/> Empleados</Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo de identificación</TableCell>
              <TableCell>Identificación</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Fecha de nacimiento</TableCell>
              <TableCell>Edad a la fecha</TableCell>
              <TableCell>Salario</TableCell>
              <TableCell>Vacuna</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(user, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((u: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.identificationType}</TableCell>
                  <TableCell>{u.identificationNumber}</TableCell>
                  <TableCell>{gender.find(x => x.value === u.gender)?.label}</TableCell>
                  <TableCell>{new Date(u.dateOfBirth).toLocaleDateString()}</TableCell>
                  <TableCell>{calcAge(u.dateOfBirth) + ' Años'}</TableCell>
                  <TableCell>{<NumberFormat value={u.salary} thousandSeparator prefix='$' displayType='text' />}</TableCell>
                  <TableCell>{u.covidVaccine ? 'SI' : 'NO'}</TableCell>
                  <TableCell>
                    <Tooltip title="Editar">
                      <IconButton>
                        <EditIcon onClick={() => handleOpen()} />
                        <EditUser open={open} handleClose={handleClose} user={u} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Detalles">
                      <IconButton onClick={() => deleteEmployee(u.id)}>
                        <Trash />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[3, 10, 25]}
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default UserList
