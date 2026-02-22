from langchain_google_genai import GoogleGenerativeAIEmbeddings
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from config import GOOGLE_API_KEY
import os

# set API key
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

# load embedding model
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    task_type="SEMANTIC_SIMILARITY"
)

# Sample job database

jobs = [
    "Need plumber for bathroom repair",
    "Looking for house painter",
    "Electric wiring installation needed",
    "Need cleaner for apartment",
    "Carpenter required for furniture work"
]

# convert jobs into embeddings
job_vectors = embeddings.embed_documents(jobs)

# User query

user_input = input("Enter what work you need: ")

query_vector = embeddings.embed_query(user_input)

# similarity calculation

scores = cosine_similarity([query_vector], job_vectors)[0]

# sort results
ranked_indices = np.argsort(scores)[::-1]

print("\nTop recommended jobs:\n")

for i in ranked_indices[:3]:
    print(f"{jobs[i]}  (score: {scores[i]:.3f})")