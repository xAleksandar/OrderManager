import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CloseIcon from '@mui/icons-material/Close';

import { Tooltip } from '@mui/material';

export const InvoicePayment = () => {
    return (
        <Tooltip title="Invoice" arrow><ReceiptIcon color="primary" /></Tooltip>
    )
}

export const CashPayment = () => {
    return (
        <Tooltip title="Cash" arrow><AttachMoneyIcon color="primary" /></Tooltip>
    )
}

export const CardPayment = () => {
    return (
        <Tooltip title="Card" arrow><PaymentIcon color="primary" /></Tooltip>
    )
}

export const PaidOrder = () => {
    return (
        <Tooltip title="Order Paid" arrow><PriceCheckIcon color="primary" /></Tooltip>
    )
}

export const NewCustomer = () => {
    return (
        <Tooltip title="New Customer" arrow><PersonAddIcon color="primary" /></Tooltip>
    )
}

export const BigOrder = () => {
    return (
        <Tooltip title="Order over 1000$" arrow><CardGiftcardIcon color="primary" /></Tooltip>
    )
}

export const Canceled = () => {
    return (
        <Tooltip title="Canceled" arrow><CloseIcon color="primary" /></Tooltip>
    )
}