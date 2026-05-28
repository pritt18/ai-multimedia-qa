from faster_whisper import WhisperModel

model = WhisperModel("base")

def transcribe_audio(file_path):

    segments, info = model.transcribe(file_path)

    full_text = ""
    timestamps = []

    for segment in segments:
        full_text += segment.text + " "

        timestamps.append({
            "start": segment.start,
            "end": segment.end,
            "text": segment.text
        })

    return full_text, timestamps