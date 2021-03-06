require 'rails_helper'

RSpec.describe "reimbursement_timesheets/edit", type: :view do
  before(:each) do
    @reimbursement_timesheet = assign(:reimbursement_timesheet, ReimbursementTimesheet.create!(
      :reimbursement_id => 1,
      :timesheet_id => 1,
      :progress_state => "MyString",
      :action_count => 1,
      :comment => "MyString"
    ))
  end

  it "renders the edit reimbursement_timesheet form" do
    render

    assert_select "form[action=?][method=?]", reimbursement_timesheet_path(@reimbursement_timesheet), "post" do

      assert_select "input#reimbursement_timesheet_reimbursement_id[name=?]", "reimbursement_timesheet[reimbursement_id]"

      assert_select "input#reimbursement_timesheet_timesheet_id[name=?]", "reimbursement_timesheet[timesheet_id]"

      assert_select "input#reimbursement_timesheet_progress_state[name=?]", "reimbursement_timesheet[progress_state]"

      assert_select "input#reimbursement_timesheet_action_count[name=?]", "reimbursement_timesheet[action_count]"

      assert_select "input#reimbursement_timesheet_comment[name=?]", "reimbursement_timesheet[comment]"
    end
  end
end
