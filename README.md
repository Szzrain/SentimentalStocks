# SentimentalStocks

## Introduction

**Why we do this?**

Some time ago, we saw some news about GameStop's stock price on the news.
We learned that GameStop's stock price suddenly rose due to the actions of people on a Reddit called Wallstreetbet,
which aroused our great interest. 
So, we came up with the idea of using programs to analyze stock data directly related to people's emotions

We started out with the idea of aggregating what people were Posting on Reddit, 
and then doing sentiment analysis, 
then eventually creating a graph that has stock data, 
sentiment data, word clouds, and so on. 
We want to be able to find a correlation between sentiment data and stock prices or prove that they don't

## Libraries
### Main

```
python 3.x
numpy
pandas
```
praw

    reddit = praw.Reddit(
        client_id="My client id",           # You may replace this to your own client id
        client_secret="My client secret",   # You may also replace this to your own client secret
        user_agent="my user agent"          # This line doesn't matter
    )
wordcloud
nltk

### Web
```
FastApi
Create React App
```
## Demo
[https://wsbot.hahapy.com](https://wsbot.hahapy.com)
![Demo.png](Demo.png)