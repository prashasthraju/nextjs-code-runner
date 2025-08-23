interface OutputProps {
  output: string;
}

const Output = ({ output }: OutputProps) => {
  return (
    <div className="border-t border-gray-300 bg-gray-900 text-green-400 font-mono p-3 h-28 overflow-auto">
      {output }
    </div>
  );
};

export default Output;
