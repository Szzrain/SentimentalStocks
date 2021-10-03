import http.client
import pandas as pd
import codecs


# We are using Alpha Vantage Api here to get stock data
conn = http.client.HTTPSConnection("alpha-vantage.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "My Rapid Api Key",  # You may replace this string with generated key from the Api website
    'x-rapidapi-host': "alpha-vantage.p.rapidapi.com"
}
stock = input('stock:')  # stock name here, such as GME, TSLA, NOK etc.

# Http request
conn.request("GET", "/query?function=TIME_SERIES_DAILY&symbol=" + stock + "&outputsize=full&datatype=csv",
             headers=headers)

res = conn.getresponse()
data = res.read()

# print(data.decode('utf-8'))

# write csv file
f = codecs.open('../../resources/stockData/' + stock + '.csv', "x", "utf-8")
f.write(data.decode('utf-8'))
f.close()

# transform csv to parquet file
df = pd.read_csv('../../resources/stockData/' + stock + '.csv')
df.to_parquet('../../resources/stockData/' + stock + '.parquet')
