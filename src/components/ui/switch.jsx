export const Switch = ({ checked, onCheckedChange }) => (
  <input type='checkbox' checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} className='h-5 w-5' />
);