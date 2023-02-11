import { Text, View, Image, ScrollView, RefreshControl } from 'react-native';
import '@react-native-firebase/firestore';
import CardDetailsLabel from '../home/card/CardDetailsLabel';
import { verticalScale } from '../../../config/metrics';
import colors from '../../../config/colors';
import properStatus from '../../../functions/properStatus';
import NoItemsYet from '../../NoItemsYet';

const HistoryBookings = ({
  bookingHistory,
  now,
  refreshing,
  handleRefresh,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 5,
        paddingHorizontal: verticalScale(15),
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {bookingHistory?.length !== 0 ? (
        bookingHistory
          ?.sort((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
          )
          ?.map((item) => {
            const { customerDetails, method, schedule, service } = item;
            const { pickup, toBeDeliver } = method;
            return (
              <View
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: 'white',
                  shadowColor: 'black',
                  shadowOpacity: 1,
                  elevation: 2,
                  marginBottom: 15,
                }}
                key={item.docId}
              >
                <View className="p-5">
                  <View
                    className="flex-row items-center"
                    style={{
                      flex: 0.5,
                    }}
                  >
                    <Image
                      className="rounded-xl self-center"
                      style={{
                        height: 60,
                        width: 60,
                      }}
                      source={{
                        uri: `${customerDetails.customerImageUrl}&date=${now}`,
                      }}
                    />
                    <View className="mx-2">
                      <Text
                        style={{
                          fontFamily: 'Alexandria-Regular',
                        }}
                      >
                        Customer Name
                      </Text>
                      <Text>{item.customerDetails.customerName}</Text>
                    </View>
                  </View>
                  <View
                    className="border-t border-b border-gray-200 my-2 py-1"
                    style={{ flex: 1 }}
                  >
                    <CardDetailsLabel label="Service" value={service} />
                    {/* method */}
                    <Text>Method</Text>
                    <View className="px-5">
                      <View className="flex-row justify-between">
                        <Text>pickup</Text>
                        <Text>{pickup}</Text>
                      </View>
                      <View className="flex-row justify-between">
                        <Text>to ne deliver</Text>
                        <Text>{toBeDeliver}</Text>
                      </View>
                    </View>
                    {schedule?.pickupDateTime && (
                      <CardDetailsLabel
                        label="Pickup Date & Time"
                        value={schedule.pickupDateTime}
                      />
                    )}
                    {schedule?.deliveryDate && (
                      <CardDetailsLabel
                        label="Delivery Date"
                        value={schedule.deliveryDate}
                      />
                    )}
                    <CardDetailsLabel
                      label="Address"
                      value={customerDetails.customerAddress}
                    />
                    <CardDetailsLabel
                      label="Phone#"
                      value={customerDetails.customerMobileNumber}
                    />
                    <CardDetailsLabel
                      textColor={colors.primary}
                      label="Status"
                      value={properStatus(item.status)}
                    />
                  </View>
                </View>
              </View>
            );
          })
      ) : (
        <NoItemsYet />
      )}
    </ScrollView>
  );
};

export default HistoryBookings;
