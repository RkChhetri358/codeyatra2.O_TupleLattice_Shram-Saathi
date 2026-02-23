from transformers import VitsModel, AutoTokenizer
import torch
import scipy.io.wavfile as wavfile
import uuid
import os

# Load models once (important!)
eng_model = VitsModel.from_pretrained("facebook/mms-tts-eng")
eng_tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-eng")

nep_model = VitsModel.from_pretrained("facebook/mms-tts-nep")
nep_tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-nep")

OUTPUT_DIR = "audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)


def generate_speech(text: str, lang: str = "eng"):
    if lang == "nep":
        tokenizer = nep_tokenizer
        model = nep_model
    else:
        tokenizer = eng_tokenizer
        model = eng_model

    inputs = tokenizer(text, return_tensors="pt")

    with torch.no_grad():
        output = model(**inputs).waveform

    audio = output.squeeze().cpu().numpy()

    filename = f"{uuid.uuid4()}.wav"
    path = os.path.join(OUTPUT_DIR, filename)

    wavfile.write(path, rate=model.config.sampling_rate, data=audio)

    return path