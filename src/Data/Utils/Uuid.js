class UuidGenerator {
    static generate(length) {
      let result = '';
      let max_length = length || 32
      
      if((max_length < 4) || (max_length > 65))
        max_length = 32;

      for (let i = 0; i < max_length; i++) {
        result += Math.floor(Math.random() * 16).toString(16);
        if (i % 4 === 0 && i !== 4) {
          result += '-';
        }
      }
      return result;
    }
}


export default UuidGenerator