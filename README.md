# SentimentalStocks

## Introduction

**Why we do this?**

Some time ago, I saw some news about GameStop's stock price on the news.
I learned that GameStop's stock price suddenly rose due to the actions of people on a Reddit called Wallstreetbet,
which aroused my great interest. 
So, I came up with the idea of using programs to analyze stock data directly related to people's emotions

I started out with the idea of aggregating what people were Posting on Reddit, 
and then doing sentiment analysis, 
then eventually creating a graph that has stock data, 
sentiment data, word clouds, and so on. 
I want to be able to find a correlation between sentiment data and stock prices or prove that they don't

## Libraries
### Main

#### python 3.x
#### numpy
NumPy offers comprehensive mathematical functions, random number generators, linear algebra routines, Fourier transforms, and more.
#### pandas
A fast, powerful, flexible and easy to use open source data analysis and manipulation tool
#### praw
A library helps me to handle Reddit API like this

    import praw
    reddit = praw.Reddit(
        client_id="My client id",           
        client_secret="My client secret",   
        user_agent="my user agent"          
    )
#### wordcloud
An easy use wordcloud generating library

In this example I store generated wordcloud data to a parquet file

    import pandas as pd
    from wordcloud import WordCloud as wc
    allText = 'some text....'
    wd = wc().generate(allText)
    words = []
    for word in wd.layout_:
        words.append(word[0])
    df = pd.DataFrame(words)
#### nltk
A leading platform for building Python programs to work with human language data. It provides easy-to-use interfaces to over 50 corpora and lexical resources

This example is how I use nltk to generate sentiment data

    from nltk.sentiment.vader import SentimentIntensityAnalyzer

    find = some Dataframe

    sid = SentimentIntensityAnalyzer()

    for title in find['title']:

        ss = sid.polarity_scores(title)

        if ss['neg'] > ss['pos']:
            neg += 1
        elif ss['neg'] != ss['pos']:
            pos += 1
        if ss['neu'] > 0.6:
            neu += 1
### Web
#### FastApi
A modern, fast (high-performance), web framework for building APIs

I use FastApi to provide data for my website demo
#### Create React App
A powerful web app framework which shows my work beautifully
## Demo
[https://wsbot.hahapy.com](https://wsbot.hahapy.com)
![Demo.png](Demo.png)