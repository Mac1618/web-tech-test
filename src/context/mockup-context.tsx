'use client';
import { createContext, useContext, useState } from 'react';

// Define the structure for mockup records
interface MockupRecord {
	id: string;
	title: string;
	description: string;
	price: string;
}

interface MockupRecordsContextType {
	records: MockupRecord[];
	addMockup: (id: number) => void;
}

export const MockupRecordsContext = createContext<MockupRecordsContextType | undefined>(undefined);

export const MockupRecordsProvider = ({ children }: { children: React.ReactNode }) => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [records, setRecords] = useState<MockupRecord[]>([]);

	// Function to add a new mockup record
	const addMockup = (id: number) => {
		// Determine the next id (incremental)
		const incrementId = `${records.length + 1}`;

		// Create the new mockup object
		const mockup: MockupRecord = {
			id: incrementId,
			title: 'Amber Sea',
			description: 'Lorem ipsum dolor sit amet.',
			price: '$100,000',
		};

		// wait for isProcessing to become true
		if (isProcessing) {
			return;
		}

		setIsProcessing(true);

		// Update the state with the new mockup added
		setTimeout(() => {
			setRecords((prevRecords) => [...prevRecords, mockup]);
			setIsProcessing(false);
		}, 5000);
	};

	return (
		<MockupRecordsContext.Provider value={{ records, addMockup }}>
			{children}
		</MockupRecordsContext.Provider>
	);
};

export const useMockupRecords = () => {
	const context = useContext<MockupRecordsContextType | undefined>(MockupRecordsContext);

	if (!context) {
		throw new Error('useMockupRecords must be used within a MockupRecordsProvider');
	}

	return context;
};
