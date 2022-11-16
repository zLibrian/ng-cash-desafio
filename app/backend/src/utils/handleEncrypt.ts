import bcryptjs from 'bcryptjs';

const handleEncrypt = {
  encrypt: async (data: string): Promise<string> => {
    const hashedPassword = await bcryptjs.hash(data, 10);
    return hashedPassword;
  },
  compare: async (data: string, encryptedData: string): Promise<boolean> => {
    const isValid = await bcryptjs.compare(data, encryptedData);
    return isValid;
  },
};

export default handleEncrypt;
