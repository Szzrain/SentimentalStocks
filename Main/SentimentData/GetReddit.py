import praw
import pandas as pd
from datetime import datetime
from praw.models import MoreComments

# we use praw as the tool to hold the request and respond
reddit = praw.Reddit(
    client_id="My client id",           # You may replace this to your own client id
    client_secret="My client secret",   # You may also replace this to your own client secret
    user_agent="my user agent"          # This line doesn't matter
)

# We are analyzing the subreddit 'wallstreetbets'
subreddit = reddit.subreddit('wallstreetbets')

# current day
cday = datetime.now().strftime('%Y-%m-%d_%H')

# three different submissions
news = []
hots = []
rises = []

# Collect 'new' submissions
for submission in subreddit.new(limit=100):
    comments = []
    for comment in list(submission.comments):
        # 'MoreComments' don't have comment.body, skip
        if isinstance(comment, MoreComments):
            continue
        comments.append({'id': comment.id, 'body': comment.body})

    d = {'id': submission.id, 'title': submission.title, 'author': submission.author.name, 'comments': comments}
    news.append(d)

ndf = pd.DataFrame(news)
del news
ndf.to_parquet('../../resources/reddit/wsb-new-' + cday + '.parquet')
del ndf

# Collect 'hot' submissions
for submission in subreddit.hot(limit=100):
    comments = []
    for comment in list(submission.comments):
        if isinstance(comment, MoreComments):
            continue
        comments.append({'id': comment.id, 'body': comment.body})

    d = {'id': submission.id, 'title': submission.title, 'author': submission.author.name, 'comments': comments}
    hots.append(d)

hdf = pd.DataFrame(hots)
del hots
hdf.to_parquet('../../resources/reddit/wsb-hot-' + cday + '.parquet')
del hdf

# Collect 'rising' submissions
for submission in subreddit.rising(limit=100):
    comments = []
    for comment in list(submission.comments):
        if isinstance(comment, MoreComments):
            continue
        comments.append({'id': comment.id, 'body': comment.body})

    d = {'id': submission.id, 'title': submission.title, 'author': submission.author.name, 'comments': comments}
    rises.append(d)
rdf = pd.DataFrame(rises)
del rises
rdf.to_parquet('../../resources/reddit/wsb-rise-' + cday + '.parquet')
