import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: This is not recommended for production use
});

async function callVisionModel(imageFile: File): Promise<string> {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not set. Please add it to your .env file.');
  }

  try {
    const base64Image = await fileToBase64(imageFile);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this image and tell me if there are any four-leaf clovers present. If there are, highlight their location. If not, mention if there are any regular clovers or no clovers at all." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    return response.choices[0]?.message?.content || "Unable to analyze the image.";
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
    if (error.status === 401) {
      throw new Error('Invalid API key. Please check your OpenAI API key in the .env file.');
    }
    throw new Error('Failed to process image with vision model: ' + (error.message || 'Unknown error'));
  }
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
}

export async function processImage(file: File): Promise<string> {
  try {
    const result = await callVisionModel(file);
    return result;
  } catch (error: any) {
    console.error('Error processing image:', error);
    throw new Error(error.message || 'Failed to process image with vision model');
  }
}