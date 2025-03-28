document.addEventListener("DOMContentLoaded", function () {
    const convertBtn = document.getElementById("convertBtn");
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const resultText = document.getElementById("result");
    
    convertBtn.addEventListener("click", async function () {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;
        
        if (!amount || isNaN(amount)) {
            resultText.textContent = "Please enter a valid amount";
            return;
        }
        
        const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const rate = data.rates[to];
            
            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                resultText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            } else {
                resultText.textContent = "Conversion rate not available";
            }
        } catch (error) {
            resultText.textContent = "Error fetching exchange rates";
            console.error("Error fetching exchange rates:", error);
        }
    });
});
