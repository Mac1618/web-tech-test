import { MockupRecordsProvider } from '@/context/mockup-context';

// Children Type
interface LayoutType {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutType) => {
	return (
		<div>
			<MockupRecordsProvider>
				{children}
			</MockupRecordsProvider>
		</div>
	);
};

export default Layout;
