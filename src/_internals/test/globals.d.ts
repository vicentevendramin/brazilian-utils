declare const Deno: {
	readonly env: {
		get(key: string): string | undefined;
	};
	readonly test: (options: {
		name: string;
		fn: () => void | Promise<void>;
		sanitizeOps?: boolean;
		sanitizeResources?: boolean;
		sanitizeExit?: boolean;
	}) => void;
};

declare global {
	var RUN_LIVE_CEP_TESTS: string | number | undefined;
	interface GlobalThis {
		RUN_LIVE_CEP_TESTS?: string | number;
	}
}
