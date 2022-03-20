import { useEnsAddress, useNativeTransactions } from "react-moralis";

export default function DisplayProfile(props) {
  const { name } = useEnsAddress(props.address);
  const { data: Transactions, error } = useNativeTransactions({address: props?.address});

  const NativeTransactions = () => {
    return (
      <div>
        {error && <>{JSON.stringify(error)}</>}
        <p>Numer of transactions: {Transactions?.total}</p>
        <p>Age of address: {Transactions?.result.slice(-1)[0].block_timestamp}</p>
      </div>
    );
  };

  return(
    <div className="px-10 py-5 space-y-5">
      {props?.address && 
        <>
          <p>Address: {props?.address}</p>
          <p>ENS: {name}</p>
          <NativeTransactions />
        </>
      }
    </div>
  )
}