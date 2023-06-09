import React from 'react';
import { Typography, Table, TableContainer, TableHead, TableBody } from '@mui/material';
import { Validator } from './Validator';
import { StyledTableCell, StyledTableRow } from '../../components/CustomTable';

export const Validators = (props) => {
  return (
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow >
              <StyledTableCell>Validator Name</StyledTableCell>
              <StyledTableCell>Staked Amount</StyledTableCell>
              <StyledTableCell>Rewards</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.validators.map((validator) => (
              <Validator validator={validator} reward={props?.rewards?.[validator.validatorAddress]} key={validator.validatorName} denom={props.denom} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};