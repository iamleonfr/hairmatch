
// Define types for hair detection
type HairTypeKeywords = Record<string, string[]>;
type HairType = string;
type ImagePrediction = {
  className: string;
  probability: number;
};

// Pre-trained categories of hair types with expanded classifications for better inclusion
const HAIR_TYPES: HairTypeKeywords = {
  // Type 4 hair (common in Black community)
  '4a': ['4a', 'type 4a', 'coily dense', 's-pattern coils', 'tight coil', 'afro type 4a'],
  '4b': ['4b', 'type 4b', 'z-pattern coils', 'tight z coil', 'afro type 4b', 'dense coily'],
  '4c': ['4c', 'type 4c', 'densest coil', 'tightest curl', 'afro type 4c', 'kinky coily'],
  
  // Type 3 hair
  '3a': ['3a', 'type 3a', 'loose curl', 'defined curl', 'curly type 3a'],
  '3b': ['3b', 'type 3b', 'springy curl', 'corkscrew curl', 'curly type 3b'],
  '3c': ['3c', 'type 3c', 'tight curl', 'corkicelli curl', 'curly type 3c', 'dense curl'],
  
  // Type 2 hair
  '2a': ['2a', 'type 2a', 'loose wave', 'slight wave', 'wavy type 2a'],
  '2b': ['2b', 'type 2b', 'defined wave', 'wavy type 2b', 's-wave'],
  '2c': ['2c', 'type 2c', 'coarse wave', 'defined s-wave', 'wavy type 2c'],
  
  // Type 1 hair
  '1': ['straight', 'type 1', 'flat hair', 'sleek hair', 'straight hair'],
  
  // General categories (kept for backward compatibility)
  'afro': ['afro', 'curly afro', 'black hair', 'kinky hair'],
  'coily': ['coil', 'coily hair', 'spiral curl', 'tight curl'],
  'curly': ['curl', 'curly hair', 'wavy curl', 'ringlet'],
  'wavy': ['wave', 'wavy hair', 'beach wave'],
  'straight': ['straight hair', 'flat hair', 'sleek hair'],
  
  // Hair styles
  'braids': ['braid', 'braided', 'plait', 'cornrows', 'box braids', 'single braids', 'ghana braids'],
  'locs': ['locs', 'dreadlocks', 'dreads', 'sisterlocks', 'faux locs'],
  'twists': ['twists', 'twist out', 'two strand twist', 'flat twist', 'senegalese twist'],
  'fades': ['fade', 'skin fade', 'taper fade', 'high fade', 'low fade'],
  'short': ['short hair', 'buzz cut', 'crew cut', 'caesar cut', 'twa', 'teeny weeny afro'],
  'long': ['long hair', 'flowing hair'],
  'dyed': ['dyed hair', 'colored hair', 'bleached', 'highlights', 'balayage', 'ombre']
};

// Mock model variable
let model: any = null;

/**
 * Initialize the mock model
 */
export const initModel = async (): Promise<void> => {
  try {
    // Simulate loading the model
    console.log('Starting hair detection model initialization');
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Set a mock model
    model = {
      classify: async (image: HTMLImageElement) => {
        // Return mock predictions - in a real implementation this would use TensorFlow.js or a similar library
        return [
          { className: '4c hair', probability: 0.85 },
          { className: 'afro texture', probability: 0.82 },
          { className: 'curly coily', probability: 0.78 },
          { className: 'type 4 hair', probability: 0.75 },
          { className: 'person', probability: 0.9 },
          { className: 'human hair', probability: 0.88 }
        ];
      }
    };
    
    console.log('Hair detection model loaded successfully');
  } catch (error) {
    console.error('Error loading hair detection model:', error);
    throw error;
  }
};

/**
 * Analyze an image and detect hair type with more detailed classification
 */
export const detectHairType = async (imageElement: HTMLImageElement): Promise<string[]> => {
  try {
    if (!model) {
      await initModel();
    }

    if (!model) {
      throw new Error('Model failed to load');
    }

    // Get mock predictions
    const predictions: ImagePrediction[] = await model.classify(imageElement);
    console.log('Raw predictions:', predictions);
    
    // Map predictions to hair types with confidence threshold
    const detectedHairTypes = new Set<string>();
    const confidenceThreshold = 0.7; // Only consider predictions above this confidence
    
    predictions.forEach(prediction => {
      if (prediction.probability >= confidenceThreshold) {
        const className = prediction.className.toLowerCase();
        
        // Check all hair type categories
        Object.entries(HAIR_TYPES).forEach(([hairType, keywords]) => {
          if (keywords.some(keyword => className.includes(keyword))) {
            detectedHairTypes.add(hairType);
          }
        });
      }
    });
    
    // For specific numeric types (4a, 4b, 4c, etc.), check if there's a general match
    // and try to determine the specific subtype
    if (
      predictions.some(p => 
        p.className.toLowerCase().includes('type 4') || 
        p.className.toLowerCase().includes('afro') || 
        p.className.toLowerCase().includes('coily')
      )
    ) {
      // Check for specific subtypes
      let hasSubtype = false;
      
      if (predictions.some(p => p.className.toLowerCase().includes('4c'))) {
        detectedHairTypes.add('4c');
        hasSubtype = true;
      } else if (predictions.some(p => p.className.toLowerCase().includes('4b'))) {
        detectedHairTypes.add('4b');
        hasSubtype = true;
      } else if (predictions.some(p => p.className.toLowerCase().includes('4a'))) {
        detectedHairTypes.add('4a');
        hasSubtype = true;
      }
      
      if (!hasSubtype) {
        detectedHairTypes.add('4c'); // Default to 4c if can't determine subtype but general type 4 detected
      }
    }
    
    if (detectedHairTypes.size === 0) {
      // If no types detected in mocked data, return some reasonable defaults
      // This ensures the UI always has something to show
      return ['4c', '4b']; 
    }
    
    return Array.from(detectedHairTypes);
  } catch (error) {
    console.error('Error during hair type detection:', error);
    throw error;
  }
};

/**
 * Process a file and return the detected hair types
 */
export const processHairImage = async (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      // Add loading indicator
      console.log('Loading image for processing...');
      
      img.onload = async () => {
        try {
          console.log('Image loaded, detecting hair type...');
          const hairTypes = await detectHairType(img);
          console.log('Detected hair types:', hairTypes);
          resolve(hairTypes);
        } catch (err) {
          console.error('Error in hair detection:', err);
          reject(err);
        } finally {
          // Clean up object URL
          URL.revokeObjectURL(img.src);
        }
      };
      
      img.onerror = () => {
        console.error('Failed to load image');
        URL.revokeObjectURL(img.src);
        reject(new Error('Failed to load image'));
      };
      
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      
      // Add a timeout to prevent hanging
      setTimeout(() => {
        if (!img.complete) {
          URL.revokeObjectURL(img.src);
          reject(new Error('Image loading timed out'));
        }
      }, 15000);
      
    } catch (error) {
      console.error('Error processing image:', error);
      reject(error);
    }
  });
};
