require 'rails_helper'

RSpec.describe "payment_types/show", type: :view do
  before(:each) do
    @payment_type = assign(:payment_type, PaymentType.create!(
      :name => "Name",
      :description => "Description"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Description/)
  end
end
