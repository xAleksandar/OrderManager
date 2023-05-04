import TablePagination from '@mui/material/TablePagination';
import { OrdersTable } from '../components/OrdersTable';
import styles from "../styles/index.module.css";

import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateRangePicker, DateRange } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Checkbox from '@mui/material/Checkbox';
import useFetchResults from "../hooks/useFetchResults";
import FormControlLabel from '@mui/material/FormControlLabel';

export default function OrdersPage() {

  const [page, setPage] = useState(0);
  const [paidOption, setPaidOption] = useState <number> (0)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchString, setSearchString] = useState <string> ("")
  const [hover, setHover] = useState <boolean> (true)
  const [selectedOrderId, setSelectedOrderId] = useState <null|number> (3087);

  const { 
    results,
    newCustomer,
    deliveryDates, 
    paymentMethods, 
    setPaymentMethods, 
    setCreationDates, 
    setDeliveryDates,
    setNewCustomer, 
    sortResults, 
    setIsPaid,
    updateResult 
  } = useFetchResults(searchString);
  
  const orders = results;

  const handlePaidOrders = (action: boolean) => {
    if (action === true && paidOption === 1 || action == false && paidOption === 2) {
      setPaidOption(0);
      setIsPaid(null);
    } else if (action === true) {
      setPaidOption(1);
      setIsPaid(true);
    } else if (action === false) {
      setPaidOption(2);
      setIsPaid(false);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (
    <div className={styles.Container}>
      <div className={styles.SearchBar}>
        
        <input 
          className={styles.SearchForm} 
          type="text"
          onChange={(event) => {
            setSearchString(event.target.value);
            sortResults();
          }} 
          placeholder="search by name or id"
        />
        
        <div className={styles.DatePickers}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          
            <DesktopDateRangePicker 
              className={styles.RangeDatePicker} 
              localeText={{ start: 'Created From', end: 'Created Till' }}
              onChange={(value: DateRange<Date> | null) => {
                value ? setCreationDates([dayjs(value[0]).unix(), dayjs(value[1]).unix()]) : setCreationDates([0, Date.now()])
              }}
            />
            
            <DesktopDatePicker
              className={styles.DatePicker}
              label="Delivery From"
              format="DD/MM/YY"
              onChange={(date: Dayjs | null) => {
                date ? setDeliveryDates([dayjs(date).unix(), deliveryDates[1]]) : setDeliveryDates([0, deliveryDates[1]])
              }}
            />

            <DesktopDatePicker
              className={styles.DatePicker}
              label="Delivery Till"
              format="DD/MM/YY"
              onChange={(date: Dayjs | null) => {
                date ? setDeliveryDates([deliveryDates[0], dayjs(date).unix()]) : setDeliveryDates([deliveryDates[0], Date.now()])
              }}
            />

          </LocalizationProvider>
        </div>
        
        <FormControl className={styles.PaymentPicker}>
        <InputLabel id="payment-method-label">Payment Method</InputLabel>
        <Select
          labelId="payment-method-label"
          id="payment-method"
          multiple
          value={paymentMethods}
          onChange={(event) => {
            setPaymentMethods(event.target.value)
          }}
          inputProps={{
            name: 'paymentMethod',
            id: 'payment-method',
          }}
        >
          {["Card", "Cash on Delivery", "Invoice"].map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        
        <FormControlLabel
          className={styles.Checkmark}
          disabled={paidOption === 2}
          control={
            <Checkbox
              checked={paidOption === 1}
              onChange={() => handlePaidOrders(true)}
              inputProps={{ 'aria-label': 'controlled-checkbox' }}
            />
          }
          label="Paid Orders"
        />

        <FormControlLabel
          className={styles.Checkmark}
          disabled={paidOption === 1}
          control={
            <Checkbox
              checked={paidOption === 2}
              onChange={() => handlePaidOrders(false)}
              inputProps={{ 'aria-label': 'controlled-checkbox' }}
            />
          }
          label="Unpaid Orders"
        />

        <FormControlLabel
          className={styles.Checkmark}
          control={
            <Checkbox
              checked={newCustomer}
              onChange={() => setNewCustomer(!newCustomer)}
              inputProps={{ 'aria-label': 'controlled-checkbox' }}
            />
          }
          label="New Customer"
        />

      </div>
      
      <OrdersTable
        orders={orders}
        page={page}
        rowsPerPage={rowsPerPage}
        hover={hover}
        selectedOrderId={selectedOrderId}
        setHover={setHover}
        setSelectedOrderId={setSelectedOrderId}
        updateResult={updateResult}
      />

      
      {orders.length == 0 ? (
        <div className={styles.ZeroResults}> No orders was found.</div>
      ) : (
        <></>
      )}
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event: React.MouseEvent<HTMLButtonElement> | null, newPage:number) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}