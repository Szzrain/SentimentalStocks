import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import datetime

cday = datetime.datetime(2021, 3, 1)
stock = input('stock:')
alls = []
tags = ['hot', 'rise', 'new']
for i in range(1, 100):
    cday = cday + datetime.timedelta(days=1)
    neg = 0.0
    neu = 0.0
    pos = 0.0
    cneg = 0.0
    cneu = 0.0
    cpos = 0.0
    skip = True
    for tag in tags:
        for hour in range(0, 24):
            try:
                strhour = str(hour)
                if hour < 10:
                    strhour = '0' + str(hour)
                df = pd.read_parquet(
                    '../../resources/reddit/wsb-' + tag + '-' + cday.strftime('%Y-%m-%d') + '_' + strhour + '.parquet')
            except Exception:
                continue

            # if parquet is not found, skip will be true
            skip = False

            # drop NaN
            df.dropna(inplace=True)

            # find related submissions
            df['Indexes'] = df["title"].str.find(stock)
            find = df.loc[df['Indexes'] >= 0]

            # init Sentiment Analyzer
            sid = SentimentIntensityAnalyzer()

            # we analyze sentiment data of title separated from comments
            # result are weighted in order to get meaningful chart
            for title in find['title']:
                ss = sid.polarity_scores(title)
                if ss['neg'] > ss['pos']:
                    neg += 1
                elif ss['neg'] != ss['pos']:
                    pos += 1
                if ss['neu'] > 0.6:
                    neu += 1

            # sentiment data of comments
            for comments in find['comments']:
                for comment in comments:
                    try:
                        sc = sid.polarity_scores(comment['body'])
                    except:
                        continue
                    if sc['neg'] > sc['pos']:
                        cneg += 1
                    elif sc['neg'] != sc['pos']:
                        cpos += 1
                    if sc['neu'] > 0.6:
                        cneu += 1
        # print('neg' + str(neg))
        # print('neu' + str(neu))
        # print('pos' + str(pos))
        # print()

    # skip if parquet does not exist
    if skip:
        continue
    toSave = {
        'timestamp': cday.strftime('%Y-%m-%d'),
        'pos': pos, 'neu': neu, 'neg': neg,
        'cpos': cpos, 'cneu': cneu, 'cneg': cneg}
    alls.append(toSave)
# make Dataframe
ndf = pd.DataFrame(alls)
# save
ndf.to_parquet('../../resources/sentiment/%s.parquet' % stock)
