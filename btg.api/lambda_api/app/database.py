# # from sqlalchemy import create_engine
# # from sqlalchemy.ext.declarative import declarative_base
# # from sqlalchemy.orm import sessionmaker
# # import os

# from sqlalchemy import create_engine, String, Column
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# # user = os.environ["DB_USER"]
# # password = os.environ["DB_PASS"]
# # host = os.environ["DB_HOST"]
# # port = os.environ["DB_PORT"]
# # database = os.environ["DB_NAME"]

# # SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{host}:{port}/{database}"
# # engine = create_engine("amazondynamodb:///?Access Key=xxx&Secret Key=xxx&Domain=amazonaws.com&Region=OREGON")
# SQLALCHEMY_DATABASE_URL = f"amazondynamodb:///?Domain=amazonaws.com"

# engine = create_engine(SQLALCHEMY_DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()
