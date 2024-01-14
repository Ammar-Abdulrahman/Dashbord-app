import React from 'react'
import { TableHead , TableRow } from '@mui/material'
import { StyledTableCell } from '../../Core/Theme/table.style'

const HeaderTable = () => {
    return (
        <>
            <TableHead>
                <TableRow>
                    <StyledTableCell align='center'>ID</StyledTableCell>
                    <StyledTableCell align='center'>Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Gender</StyledTableCell>
                    <StyledTableCell align="center">Height</StyledTableCell>
                    <StyledTableCell align="center">Weight</StyledTableCell>
                    <StyledTableCell align="center">BirthDate</StyledTableCell>
                </TableRow>
            </TableHead>
        </>
    )
}

export default HeaderTable

export const dynamicColumns = [
    {field:'id' , headerName: 'ID', width:100},
    {field:'name' , headerName: 'Name', width:180 },
    {field:'email' , headerName: 'Email', width:240},
    {field:'gender' , headerName: 'Gender', width:140},
    {field:'height' , headerName: 'Height', width:140},
    {field:'weight' , headerName: 'Weight', width:140 },
    {field:'birthDate' , headerName: 'BirthDate', width:108},
]

