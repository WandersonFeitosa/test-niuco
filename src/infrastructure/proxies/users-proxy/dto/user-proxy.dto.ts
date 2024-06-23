export interface UserProxyOutput {
  id: string;
  name: string;
  email: string;
  status: 'enabled' | 'disabled';
  role: 'admin' | 'editor' | 'system' | 'viewer' | '';
  last_activity: number;
}
