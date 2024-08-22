import { formatDate } from '~/utils/dates';
import MapPin from './icons/MapPin';
import PhoneIcon from './icons/PhoneIcon';
import DesktopIcon from './icons/DesktopIcon';
import BuildingIcon from './icons/BuildingIcon';
import MobilePhoneIcon from './icons/MobilePhoneIcon';

export default function SingleResult({ data }: any) {
  const result = data.results[0];
  console.log(result);

  const isAvailable = (object: any) => {
    return object && object.length > 0;
  };

  return (
    <div className='w-full h-2/3 mt-6 bg-slate-50/50 p-8 pb-16 border border-sky-200'>
      <div>
        <h2 className='text-xl font-bold text-sky-600'>{result.name}</h2>
        <p className='font-thin text-sm'>Business ID {result.businessId}</p>

        <div className='mt-4'>
          {result.businessLines && (
            <p className='flex items-center mb-1'>
              <BuildingIcon className='size-5 mr-4 text-sky-600' />
              <span>{result.businessLines[0].name}</span>
            </p>
          )}
          {isAvailable(result.contactDetails) && (
            <RenderContactDetails contactDetails={result.contactDetails} />
          )}
          {isAvailable(result.addresses) && result.addresses[0].puhelin && (
            <p className='flex items-center mb-1'>
              <PhoneIcon className='size-5 mr-4 text-sky-600' />
              <span>{result.addresses[0].phone}</span>
            </p>
          )}
          {<RenderAddress addresses={result.addresses} />}
          <p className='mt-3 text-sm text-slate-500'>
            First registered in {formatDate(result.registrationDate)}
          </p>
        </div>
      </div>
    </div>
  );
}

const RenderContactDetails = ({ contactDetails }: any) => {
  if (!contactDetails || contactDetails.length === 0) return null;

  const latestVersion = Math.max(
    ...contactDetails.map((contact: any) => contact.version)
  );

  const latestContactDetails = contactDetails.filter(
    (contact: any) => contact.version === latestVersion
  );

  const getContactDetailsByType = (type: string) => {
    return latestContactDetails.find((contact: any) => contact.type === type);
  };

  const website = getContactDetailsByType('Website address');
  const phone = getContactDetailsByType('Puhelin');
  const mobilePhone = getContactDetailsByType('Matkapuhelin');

  return (
    <div>
      {website && (
        <p className='flex items-center mb-1'>
          <DesktopIcon className='size-5 mr-4 text-sky-600' />
          <span>{website.value}</span>
        </p>
      )}
      {phone && (
        <p className='flex items-center mb-1'>
          <PhoneIcon className='size-5 mr-4 text-sky-600' />
          <span>{phone.value}</span>
        </p>
      )}
      {mobilePhone && (
        <p className='flex items-center mb-1'>
          <MobilePhoneIcon className='size-5 mr-4 text-sky-600' />
          <span>{mobilePhone.value}</span>
        </p>
      )}
    </div>
  );
};

const RenderAddress = ({ addresses }: any) => {
  if (!addresses || addresses.length === 0) return null;

  const getMostRecentAddress = () => {
    return addresses.reduce(
      (
        latest: { registrationDate: string | number | Date },
        current: { registrationDate: string | number | Date }
      ) => {
        return new Date(latest.registrationDate) >
          new Date(current.registrationDate)
          ? latest
          : current;
      },
      addresses[0]
    );
  };

  const recentAddress = getMostRecentAddress();

  return (
    <p className='flex items-center mb-1'>
      <MapPin className='size-5 mr-4 text-sky-600' />
      <span className='capitalize'>
        {recentAddress.street}, {recentAddress.postCode} {recentAddress.city}
      </span>
    </p>
  );
};
