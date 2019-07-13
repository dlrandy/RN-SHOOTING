<ScrollView contentContainerStyle={{paddingTop: 30}}>
{restaurants.filter(place => {
  return !this.state.search || place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
}).map((place, index) => {
  return (
    <View key={place.name} style={[styles.row, {backgroundColor: index % 2 ==  0 ? 'white' : '#F3F3F7' }]}>
      <Text style={styles.edges}>{index + 1}</Text>
      <View style={styles.nameAddress}>
        <Text>{place.name}</Text>
        <Text style={styles.addressText}>{place.address}</Text>
      </View>
      <Text style={styles.edges}>Info</Text>
    </View>
  );
})}
</ScrollView>