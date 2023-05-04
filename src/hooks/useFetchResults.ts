import { useState, useEffect } from "react"
import mockedResults from "../mockedData/mockedResults.json";
import resultType from "@/types/resultType";

const useFetchResults = (searchString: string) => {

    const [rawResults, setRawResults] = useState <resultType[]> ([])
    const [results, setResults] = useState <resultType[]> ([])
    const [isPaid, setIsPaid] = useState <null | boolean> (null)
    const [newCustomer, setNewCustomer] = useState <boolean> (false);
    const [paymentMethods, setPaymentMethods] = useState <string | string[]> ([])
    const [creationDates, setCreationDates] = useState <number[]> ([0, Date.now()])
    const [deliveryDates, setDeliveryDates] = useState <number[]> ([0, Date.now()])


    // Used For initial data fetching, probably from backend server via API.
    useEffect(() => {
        async function fetchResults() {
            // Mocking actual API call and getting results from file instead.
            setRawResults(mockedResults)
        }
        
        fetchResults()}, [])
    
    
    // Used to sort and return results after filtering.
    // This useEffect is triggered after any change in the filter parameters.
    useEffect(() => {
        async function setup() {
            sortResults()
        }
        
        setup()}, [rawResults, deliveryDates, creationDates, paymentMethods, isPaid, searchString, newCustomer])
    
    
    // Actual result sorting.
    const sortResults = () => {
        // Name and Order ID filtering.
        let _results = rawResults.filter(
            result => 
                result["Name"].toLowerCase().includes(searchString.toLowerCase()) ||
                result["Order ID"].toString().includes(searchString.toLowerCase())
            )
        
        // Paid / Not paid orders filtering.
        .filter(result => isPaid === null || result["Paid"] === isPaid)
        
        // Delivery Date filtering. 
        .filter(result => result["Delivery Date"] >= deliveryDates[0] && result["Delivery Date"] <= deliveryDates[1] + 86400)
        
        // New customers filtering. Check's if option is selected and returns only new customers.
        if (newCustomer) {
            _results = _results.filter(result => result["New Customer"] === true);
        }

        // Creation Date filtering.
        // Note: Dye to the Range Calendar used, we need to check whether both numbers
        // are setup and only then execute the filtering.
        if (!Number.isNaN(creationDates[0]) && !Number.isNaN(creationDates[1])) {
            _results = _results.filter(result => result["Order Date"] >= creationDates[0] && result["Order Date"] <= creationDates[1] + 86400)
        }

        // Payment type filtering. The filter won't be activated if there aren't any payment option selected. Multiple choices available.
        if (paymentMethods.length > 0) {
            _results = _results.filter(result => paymentMethods.includes(result['Payment Type']))
        }

        // Set the new results
        setResults(_results)
    }

    // Used to update Results.
    // In production, it would send API request to the database with the new data,
    // For the ease of testing, we are mocking the results and just updating the temporary storage.
    const updateResult = (action: string, id: number) => {
        
        //If action == delete, then remove the result from database.
        if (action == "delete") {
            setRawResults(rawResults.filter(result => result["Order ID"] != id))
        
        //If action == cancel, update order's status to Cancelled.
        } else if (action == "cancel") {
            let _results = rawResults
            for (let i = 0; i < _results.length; i++) {
                if (_results[i]["Order ID"] === id) {
                    _results[i]["Canceled"] = true
                }
            }
            
            setRawResults([..._results])
        }
    }

    return {
        results,
        sortResults,
        setIsPaid,
        setNewCustomer,
        paymentMethods,
        setPaymentMethods,
        setCreationDates,
        setDeliveryDates,
        updateResult,
        deliveryDates,
        creationDates,
        newCustomer
    }
}

export default useFetchResults;