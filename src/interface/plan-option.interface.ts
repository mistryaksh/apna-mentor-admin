export interface PaymentOptionProps {
     planName: string;
     price: number;
     active?: boolean;
     offer?: string;
     validFor: string;
     includes?: string[];
     createdAt?: string;
     updatedAt?: string;
     _id?: string;
}
