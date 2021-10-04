import datetime
import pandas as pd
from wordcloud import WordCloud as wc

# We start collect our data at this time
cday = datetime.datetime(2021, 3, 1)

stock = input('stock:')
tags = ['hot', 'rise', 'new']
allText = ''
for tag in tags:
    for day in range(1, 100):
        cday = cday + datetime.timedelta(days=1)
        for hour in range(0, 24):
            try:
                strhour = str(hour)
                if hour < 10:
                    # placeholder
                    strhour = '0' + str(hour)
                df = pd.read_parquet(
                    '../../resources/reddit/wsb-' + tag + '-' + cday.strftime('%Y-%m-%d') + '_' + strhour + '.parquet')
            except Exception:
                continue
            # drop NaN
            df.dropna(inplace=True)
            # find related submissions
            df['Indexes'] = df["title"].str.find(stock)
            find = df.loc[df['Indexes'] >= 0]
            # we combine all comments to a big string
            for title in find['title']:
                allText = allText + ' ' + title
            for comments in find['comments']:
                for comment in comments:
                    allText = allText + ' ' + comment['body']
# generate wordcloud
wd = wc().generate(allText)
words = []
''' This library is designed for matplotlib, but we don't use matplotlib to draw wordcloud, so we save wordcloud data 
 for future use '''
for word in wd.layout_:
    words.append(word[0])
df = pd.DataFrame(words)
df.columns = ['name', 'value']
# print(df.to_dict(orient='records'))
df.to_parquet('../../resources/wordcloud/%s.parquet' % stock)
