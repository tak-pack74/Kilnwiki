FROM python:3

ENV FLASK_APP kilnwiki.py
ENV FLASK_CONFIG production

RUN adduser --disabled-password kilnwiki 
USER kilnwiki
WORKDIR /home/kilnwiki

COPY app app
COPY migrations migrations
COPY requirements.txt kilnwiki.py config.py boot.sh ./

RUN python -m venv venv \
&& venv/bin/pip install -r requirements.txt

EXPOSE 5000
ENTRYPOINT [ "./boot.sh" ]