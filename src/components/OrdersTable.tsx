import React, { Dispatch, SetStateAction } from "react";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import styles from "../styles/ordersTable.module.css";
import resultType from '@/types/resultType';

import { 
    InvoicePayment,
    CardPayment,
    CashPayment,
    PaidOrder,
    NewCustomer,
    BigOrder,
    Canceled
} from "./icons";



interface OrdersTableProps {
    orders: resultType[];
    page: number;
    rowsPerPage: number;
    hover: boolean;
    selectedOrderId: number | null;
    setHover: Dispatch<SetStateAction<boolean>>;
    setSelectedOrderId: Dispatch<SetStateAction<number | null>>;
    updateResult: (action: string, id: number) => void;
  }

// export const ordersTable = () => (
//     orders: resultType[],
//     page: number,
//     rowsPerPage: number,
//     hover: boolean,
//     selectedOrderId: number,
//     setHover: React.Dispatch<React.SetStateAction<boolean>>,
//     setSelectedOrderId: React.Dispatch<React.SetStateAction<number | null>>,
//     updateResult: (action: string, id: number) => void

//     ) => {

export const OrdersTable: React.FC<OrdersTableProps> = ({
    orders,
    page,
    rowsPerPage,
    hover,
    selectedOrderId,
    setHover,
    setSelectedOrderId,
    updateResult,
}) => {

    return (
        <div>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Order Price</TableCell>
                    <TableCell>Creation Date</TableCell>
                    <TableCell>Delivery Date</TableCell>
                    <TableCell>Payment method</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Details</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                
                {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                    <TableRow className={styles.TableRow} key={order['Order ID']} onMouseEnter={() => { setHover(true); setSelectedOrderId(order['Order ID'])}} onMouseLeave={() => { setHover(false); setSelectedOrderId(null)}}>
                        <TableCell>{hover && selectedOrderId === order['Order ID'] ? (
                        <div className={styles.EditButtons}>
                            <button className={styles.DeleteBtn} onClick={() => updateResult("delete", order["Order ID"])}>Delete</button>
                            {order["Canceled"] ? (<></>) : (<button className={styles.EditBtn} onClick={() => updateResult("cancel", order["Order ID"])}>Cancel</button>)}
                            
                        </div>
                        ) : (
                            order['Order ID']
                        )}
                        </TableCell>
                        <TableCell>{order['Name']}</TableCell>
                        <TableCell>{order['Order Price'].toString() + "$"}</TableCell>
                        <TableCell>{(new Date(order['Order Date'] * 1000).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'}))}</TableCell>
                        <TableCell>{(new Date(order['Delivery Date'] * 1000).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'}))}</TableCell>                
                        <TableCell>{order['Payment Type']}</TableCell>
                        <TableCell>{order['Paid'] ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                        {order["Canceled"] ? (<Canceled />) : (<></>)}
                        {order["Payment Type"] === "Invoice" ? (<InvoicePayment />) : (<></>)}
                        {order["Payment Type"] === "Card" ? (<CardPayment />) : (<></>)}
                        {order["Payment Type"] === "Cash on Delivery" ? (<CashPayment />) : (<></>)}
                        {order["Paid"] ? (<PaidOrder />) : (<></>)}
                        {order["Order Price"] >= 1000 ? (<BigOrder />) : (<></>)}
                        {order["New Customer"] ? (<NewCustomer />) : (<></>)}
                        </TableCell>
                    </TableRow>
                    ))}

                </TableBody>
            </Table>
        </div>
    )
}
