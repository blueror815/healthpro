require 'rails_helper'

RSpec.describe "payment_types/new", type: :view do
  before(:each) do
    assign(:payment_type, PaymentType.new(
      :name => "MyString",
      :description => "MyString"
    ))
  end

  it "renders new payment_type form" do
    render

    assert_select "form[action=?][method=?]", payment_types_path, "post" do

      assert_select "input#payment_type_name[name=?]", "payment_type[name]"

      assert_select "input#payment_type_description[name=?]", "payment_type[description]"
    end
  end
end
