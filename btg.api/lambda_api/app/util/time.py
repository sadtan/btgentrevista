import datetime

def get_current_date_str():
    return datetime.datetime.now(datetime.timezone.utc).strftime("%m/%d/%Y, %H:%M:%S")