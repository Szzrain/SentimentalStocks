from fastapi import FastAPI
import pandas as pd
import uvicorn
import time

app = FastAPI()


@app.get("/stock/{item_name}/{timestamp_start}/{timestamp_end}")
async def root(item_name: str, timestamp_start: str, timestamp_end: str):
    try:
        df = pd.read_parquet('../../resources/stockData/%s.parquet' % item_name)
        data = []
        del df['volume']
        df = df[['timestamp', 'open', 'close', 'low', 'high']]
        df = df[(df['timestamp'] >= timestamp_start) & (df['timestamp'] <= timestamp_end)]
        df = df.reindex(index=df.index[::-1])
    except Exception as e:
        print(e)
        return 'File not found'
    for index, row in df.iterrows():
        row['timestamp'] = time.strftime('%Y/%m/%d', time.strptime(row['timestamp'], '%Y-%m-%d'))
        data.append(row)
    return pd.DataFrame(data).to_numpy().tolist()


@app.get("/stockDetail/{item_name}/{timestamp_start}/{timestamp_end}")
async def root(item_name: str, timestamp_start: str, timestamp_end: str):
    try:
        df = pd.read_parquet('../../resources/stockData/%s.parquet' % item_name)
        data = []
        df = df[['timestamp', 'open', 'close', 'low', 'high', 'volume']]
        df = df[(df['timestamp'] >= timestamp_start) & (df['timestamp'] <= timestamp_end)]
        df = df.reindex(index=df.index[::-1])
    except Exception as e:
        print(e)
        return 'File not found'
    for index, row in df.iterrows():
        row['timestamp'] = time.strftime('%Y/%m/%d', time.strptime(row['timestamp'], '%Y-%m-%d'))
        data.append(row)
    return pd.DataFrame(data).to_dict(orient='records')


@app.get('/wordcloud/{item_name}')
async def root(item_name: str):
    try:
        df = pd.read_parquet('../../resources/wordcloud/%s.parquet' % item_name)
    except:
        return "File not found"
    return df.to_dict(orient='records')


@app.get('/sentiment/{item_name}/{timestamp_start}/{timestamp_end}')
async def root(item_name: str, timestamp_start: str, timestamp_end: str):
    data = []
    try:
        df = pd.read_parquet('../../resources/sentiment/%s.parquet' % item_name)
        df = df[['timestamp', 'pos', 'neu', 'neg', 'cpos', 'cneu', 'cneg']]
        df = df[(df['timestamp'] >= timestamp_start) & (df['timestamp'] <= timestamp_end)]
    except:
        return "File not found"
    for index, row in df.iterrows():
        row['pos'] = row['pos'] + row['cpos']
        row['neu'] = row['neu'] + row['cneu']
        row['neg'] = row['neg'] + row['cneg']
        del row['cpos']
        del row['cneg']
        del row['cneu']
        data.append(row)
    return pd.DataFrame(data).to_dict()


@app.get("/")
async def root():
    return {'message': 'hello'}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
