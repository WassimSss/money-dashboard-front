'use client'

import Header from "@/lib/components/Header"
import { useState } from "react"
var moment = require('moment');


export default function Page() {
    // const [expenses, setExpenses] = useState<[]>([])
    const expenses = [
        {
            description: "OBM Food",
            category: "Fast-Food",
            date: moment().format(),
            amount: 26
        },


    ]

    const allExpenses = expenses.map(expense => {
        return <div>
            <p>{expense.description}</p>
            <p>{expense.category}</p>
            <p>{expense.date}</p>
            <p>{expense.amount}</p>
        </div>
    })
    return (
        <div>
            <Header />

            <p>Expenses</p>

            <div>
                {allExpenses}
            </div>
        </div>
    )
}
