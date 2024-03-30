from transformers import RobertaTokenizerFast, TFRobertaForSequenceClassification, pipeline
import gradio as gr

tokenizer = RobertaTokenizerFast.from_pretrained("arpanghoshal/EmoRoBERTa")
model = TFRobertaForSequenceClassification.from_pretrained("arpanghoshal/EmoRoBERTa")

emotion = pipeline('sentiment-analysis',
                    model='arpanghoshal/EmoRoBERTa')

user_input = input("Enter your sentence: ")
emotion_labels = emotion(user_input)

def greet(name):
  emotion_labels = emotion(name)
  return emotion_labels[0]['label']

demo = gr.Interface(fn=greet, inputs="textbox", outputs="textbox") #gradio

print(emotion_labels)
demo.launch(share=True) #gradio